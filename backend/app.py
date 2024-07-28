from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_response(user_input):
    user_input = user_input.lower()
    if 'hello' in user_input or 'hi' in user_input:
        return 'Hello! How can I help you today?'
    elif 'how are you' in user_input:
        return 'I am just a bot, but I am doing fine. How about you?'
    elif 'bye' in user_input:
        return 'Goodbye! Have a great day!'
    else:
        return 'Sorry, I did not understand that.'

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message', '')
    response = get_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
