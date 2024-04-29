import gradio as gr
import os
import time
import random

# Custom Card Component
class CustomCard(gr.Interface):
    def __init__(self, product):
        image = gr.outputs.Image(product["image"], label="Product Image")
        name = gr.outputs.Label(product["name"], label="Product Name")
        description = gr.outputs.Label(product["description"], label="Product Description")
        super().__init__(inputs=[], outputs=[image, name, description])

def print_like_dislike(x: gr.LikeData):
    print(x.index, x.value, x.liked)

def add_message(history, message):
    for x in message["files"]:
        history.append(((x,), None))
    if message["text"] is not None:
        history.append((message["text"], None))
    return history, gr.MultimodalTextbox(value=None, interactive=False)

def generate_product_card():
    # Sample product data (for demonstration purposes)
    products = [
        {"name": "Smartphone", "image": "https://via.placeholder.com/150", "description": "Latest smartphone with AI camera"},
        {"name": "Laptop", "image": "https://via.placeholder.com/150", "description": "Powerful laptop for gaming and work"},
        {"name": "Headphones", "image": "https://via.placeholder.com/150", "description": "Wireless headphones with noise cancellation"},
        {"name": "T-shirt", "image": "https://via.placeholder.com/150", "description": "Cotton t-shirt for everyday wear"},
        {"name": "Jeans", "image": "https://via.placeholder.com/150", "description": "Slim fit jeans for men"}
    ]
    
    # Select a random product
    product = random.choice(products)
    
    # Create custom card component
    card_component = CustomCard(product)
    
    return card_component

def bot(history):
    response = [generate_product_card() for _ in range(3)]  # Generate 3 random product cards
    history[-1][1] = ""
    for card in response:
        history.append((card, None))
        time.sleep(0.05)
        yield history

with gr.Blocks() as demo:
    chatbot = gr.Chatbot(
        [],
        elem_id="chatbot",
        bubble_full_width=False
    )

    chat_input = gr.MultimodalTextbox(interactive=True, file_types=["image"], placeholder="Enter message or upload file...", show_label=False)

    chat_msg = chat_input.submit(add_message, [chatbot, chat_input], [chatbot, chat_input])
    bot_msg = chat_msg.then(bot, chatbot, chatbot, api_name="bot_response")
    bot_msg.then(lambda: gr.MultimodalTextbox(interactive=True), None, [chat_input])

    chatbot.like(print_like_dislike, None, None)

demo.queue()
demo.launch()