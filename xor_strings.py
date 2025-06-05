import base64

def xor_encrypt(text, key):
    return ''.join(chr(ord(c) ^ ord(key[i % len(key)])) for i, c in enumerate(text))

def encrypt_email(email, key):
    encrypted = xor_encrypt(email, key)
    return base64.b64encode(encrypted.encode()).decode()

# This is just so we can avoid BOTs or crawlers from scraping the email
# This will be placed on to our website and a similar decryption function will be used to retrieve the email on click
email = "Your Email Here"
key = "mySecretKey123"
encrypted_email = encrypt_email(email, key)
print(encrypted_email)