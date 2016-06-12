from flask import Flask
from flask import render_template, request
import function

app = Flask(__name__)
api = function.api()

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/add', methods=['POST'])
def add():
	form = request.form['input']
	add  = api.add(form)
	return str({'string':'string'})

@app.route('/get', methods=['POST'])
def get():
	retr = api.get()
	return str(retr)

@app.route('/edit', methods=['POST'])
def edit():
	form = request.form['input']
	rval = request.form['replace']
	edit = api.edit(form,rval)
	return str({'string':'string'})

@app.route('/delete', methods=['POST'])
def delete():
	form = request.form['input']
	dele = api.delete(form)
	return str({'string':'string'})