
# ----- Example Python program to resize an Image -----

from PIL import Image
# Create an Image object from a jpg file
img  = Image.open('imgs/Activity2.png')
# # Make the new image half the width and half the height of the original image
# resizedImage = img.resize((round(img.size[0]*.5), round(img.size[1]*.5)))
resizedImage = img.resize((600, 500))

# # Display the original image
# img.show()
# # Display the resized image
# resizedImage.show()

# Save the resized image to disk
resizedImage.save("Activity2.png")

# # Scale a region
# resizedAndScaled = img.resize((round(img.size[0]*.5), round(img.size[1]*.5)), box=(100,100,200,225))
# resizedAndScaled.show()