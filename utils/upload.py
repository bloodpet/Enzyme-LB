import os
import commands
import Image
from django.db import models


def image_resize(infile):
    filename = '%s/%s' % (os.getcwd(), infile.name)
    print 'Resizing image: %s' % (filename)
    im = Image.open(filename)
    format = im.format;
    w, h = im.size;
    minw = 900
    minh = 600
    if w < minw:
        minw = w
    if h < minh:
        minh = h
    im.thumbnail((minw, minh), Image.ANTIALIAS)
    im.save(filename, format)

def video2flv(infile):
    path = os.getcwd() 
    filename = '%s' % (infile.name)
    flvfilename = '%s.flv' % filename
    print 'Converting video: %s to flv' % (filename)
    ffmpeg = 'ffmpeg -y -i "%s/%s" -f flv "%s/%s"' % (path, filename, path, flvfilename)
    ffmpegresult = commands.getoutput(ffmpeg)
    return flvfilename


