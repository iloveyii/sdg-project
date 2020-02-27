"""
WSGI config for project1 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application
sys.path.append('/home/alex/projects/sustainable_projects/project1')
sys.path.append('/home/alex/projects/sustainable_projects/project1/project1')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project1.settings')

application = get_wsgi_application()
