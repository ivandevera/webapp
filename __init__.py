from flask import Flask

app = Flask(__name__)
from webapp import wsgi 

if __name__ == '__main__':
	app.run()