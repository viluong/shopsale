import os

from django.shortcuts import render

from django.conf import settings


# Create your views here.
class BasicStorage:
	def __init__(self) -> None:
		self.path = None
		self.location = settings.LOCATION_STORAGE

	def upload(self, f, dir=None):
		if not dir:
			dir = self.location
		complete_path = os.path.join(dir, f.name)
		with open(complete_path, 'wb+') as destination:
			for chunk in f.chunks():
				destination.write(chunk)
		self.path = complete_path
		return complete_path


class AwsStorage:
    def __init__(self) -> None:
        self.path = None
    
    def upload(self, f, dir):
        return None


class FactoryStorage:

	@property
	def location(self):
		if self._instance:
			return self._instance.location
		return settings.LOCATION_STORAGE

	def __init__(self, type) -> None:
		types = {
            'default': BasicStorage,
            'basic': BasicStorage,
            'aws': AwsStorage,
        }
		self._instance = types[type]()

	def upload(self, f, dir=None):
		self._instance.upload(f, dir)
	
