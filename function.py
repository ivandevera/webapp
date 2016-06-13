from pymongo import MongoClient
db = MongoClient("127.2.78.2", 27017)
db.webapp.authenticate('admin', 'QjTGRj1Ag2XX')
dbase = db.webapp

class api(object):

	def add(self, entry):
		create = {'input':entry}
		insert = dbase.list.insert_one(create)
		return insert

	def get(self):
		read   = dbase.list.find()
		retrvd = []
		cal = type(retrvd)
		for data in read:
			retrvd.append(data)	
		return str(retrvd)

	def edit(self, val, rval):
		edit = dbase.list.update_one(
				{"input":rval},
				{
					"$set" : {
						"input":val
					}
				}
			)
		return edit

	def delete(self, var):
		delete = dbase.list.delete_one({'input':var})
		return delete