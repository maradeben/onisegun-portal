from flask import Flask, jsonify, request
from flask_cors import CORS
from api import query_user
from auth import signup_user, login_user
from utils import generate_token, verify_token
from functools import wraps
# Decorator to require token authentication
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        if not token:
            return jsonify({'error': 'Token is missing!'}), 401
        user_id = verify_token(token)
        if not user_id:
            return jsonify({'error': 'Token is invalid or expired!'}), 401
        return f(*args, **kwargs)
    return decorated

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Onisegun Portal API!"}), 200

# Signup endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    result = signup_user(data)
    if 'error' in result:
        return jsonify(result), 400
    return jsonify(result), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = login_user(username, password)
    if user:
        token = generate_token(user['id'])
        return jsonify({"token": token, "user": user}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
# Logout endpoint
@app.route('/logout', methods=['POST'])
@token_required
def logout():
    return jsonify({"message": "Successfully logged out. Please delete your token on the client."}), 200

# Unified endpoint: /user (all users) and /user/<query> (single user)
@app.route('/user', methods=['GET'])
@app.route('/user/<query>', methods=['GET'])
@token_required
def get_user(query=None):
    """Endpoint to get all users or a single user by id/username."""
    result = query_user(query)
    if result is None:
        return jsonify({"error": "User not found"}), 404
    # If query is None or empty, result is a list (all users)
    if isinstance(result, list):
        return jsonify(result), 200
    # Otherwise, result is a single user dict
    return jsonify(result), 200

@app.route('/test')
def test():
    return jsonify({"message": "Test endpoint is working!"}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not Found"}), 404

if __name__ == "__main__":
    app.run(debug=True, host='localhost', port=5000)
