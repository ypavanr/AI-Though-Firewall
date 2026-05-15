import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoConfig, AutoModel, PreTrainedModel

class DesklibAIDetectionModel(PreTrainedModel):
    config_class = AutoConfig

    def __init__(self, config):
        super().__init__(config)
        # Initialize the base transformer model.
        self.model = AutoModel.from_config(config)
        # Define a classifier head.
        self.classifier = nn.Linear(config.hidden_size, 1)
        # Initialize weights (handled by PreTrainedModel)
        self.init_weights()
        # Required for compatibility with Transformers v5+
        self.post_init()

    def forward(self, input_ids, attention_mask=None, labels=None):
        # Forward pass through the transformer
        outputs = self.model(input_ids, attention_mask=attention_mask)
        last_hidden_state = outputs[0]
        # Mean pooling
        input_mask_expanded = attention_mask.unsqueeze(-1).expand(last_hidden_state.size()).float()
        sum_embeddings = torch.sum(last_hidden_state * input_mask_expanded, dim=1)
        sum_mask = torch.clamp(input_mask_expanded.sum(dim=1), min=1e-9)
        pooled_output = sum_embeddings / sum_mask

        # Classifier
        logits = self.classifier(pooled_output)
        loss = None
        if labels is not None:
            loss_fct = nn.BCEWithLogitsLoss()
            loss = loss_fct(logits.view(-1), labels.float())

        output = {"logits": logits}
        if loss is not None:
            output["loss"] = loss
        return output

# Global variables to hold the loaded model and tokenizer
_model = None
_tokenizer = None
_device = None

def get_model_and_tokenizer():
    global _model, _tokenizer, _device
    if _model is None or _tokenizer is None:
        model_directory = "desklib/ai-text-detector-v1.01"
        _tokenizer = AutoTokenizer.from_pretrained(model_directory)
        _model = DesklibAIDetectionModel.from_pretrained(model_directory)
        
        # Use MPS (Metal Performance Shaders) on Mac if available, otherwise CPU
        if torch.backends.mps.is_available():
            _device = torch.device("mps")
        elif torch.cuda.is_available():
            _device = torch.device("cuda")
        else:
            _device = torch.device("cpu")
            
        _model.to(_device)
        _model.eval()
    return _model, _tokenizer, _device

def predict_single_text(text: str, max_len: int = 768, threshold: float = 0.5) -> dict:
    model, tokenizer, device = get_model_and_tokenizer()
    
    encoded = tokenizer(
        text,
        padding='max_length',
        truncation=True,
        max_length=max_len,
        return_tensors='pt'
    )
    input_ids = encoded['input_ids'].to(device)
    attention_mask = encoded['attention_mask'].to(device)

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        logits = outputs["logits"]
        probability = torch.sigmoid(logits).item()

    label = 1 if probability >= threshold else 0
    classification = "AI Generated" if label == 1 else "Not AI Generated"
    
    return {
        "probability": probability,
        "label": label,
        "classification": classification
    }
