"""Recolour only painted pixels, retaining luminance detail and original dimensions."""
import sys
import numpy as np
from PIL import Image, ImageOps, ImageColor
source, mask_path, colour, destination = sys.argv[1:]
im = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
mask = Image.open(mask_path).convert('RGBA')
if mask.size != im.size:
    raise ValueError('Selection dimensions do not match the photo')
a = np.asarray(im).astype(float) / 255
coverage = np.asarray(mask)[:, :, 3].astype(float) / 255
if not coverage.any():
    raise ValueError('Paint over the clothing first')
target = np.array(ImageColor.getrgb(colour)) / 255
luminance = a @ np.array([.2126, .7152, .0722])
mid = max(float(np.median(luminance[coverage > 0])), .03)
shade = np.clip(luminance / mid, .2, 2)
recoloured = np.clip(target[None, None, :] * shade[:, :, None], 0, 1)
output = np.rint(255 * (a * (1-coverage[:, :, None]) + recoloured * coverage[:, :, None])).astype('uint8')
Image.fromarray(output).save(destination, 'PNG')
