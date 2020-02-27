from Xlib import display

from app1.models import Model
from django.http import HttpResponse
from matplotlib import pylab
from pylab import *
import PIL, PIL.Image, io
from airtest.aircv.utils import pil_2_cv2


class Analysis:
    def __init__(self, file_name):
        print('Class Analysis initialized')
        self.filename = file_name

    def preprocess(self):
        print('Pre processing data', self.file_name)

    def analyze(self):
        # steps to anaylyze
        print('Analyzing file', self.file_name)

    def save_results(self):
        m = Model()
        m.create('filename', 'plot_paths', 'results')

    def getimage(request):
        # Construct the graph
        x = arange(0, 2 * pi, 0.01)
        s = cos(x) ** 2
        plot(x, s)

        xlabel('xlabel(X)')
        ylabel('ylabel(Y)')
        title('Simple Graph!')
        grid(True)

        # Store image in a string buffer
        buffer = io.StringIO()
        canvas = pylab.get_current_fig_manager().canvas
        canvas.draw()
        pilImage = PIL.Image.fromstring("RGB", canvas.get_width_height(), canvas.tostring_rgb())
        pilImage.save(buffer, "PNG")
        pylab.close()

        # Send buffer in a http response the the browser with the mime type image/png set
        return buffer.getvalue()

    def MatPlot(request):
        # Example plot
        N = 50
        x = np.random.rand(N)
        y = np.random.rand(N)
        colors = np.random.rand(N)
        area = np.pi * (15 * np.random.rand(N)) ** 2
        plt.scatter(x, y, s=area, c=colors, alpha=0.5)
        # The trick is here.
        f = io.BytesIO()
        plt.savefig(f, format="png", facecolor=(0.95, 0.95, 0.95))
        encoded_img = base64.b64encode(f.getvalue()).decode('utf-8').replace('\n', '')
        f.close()
        # And here with the JsonResponse you catch in the ajax function in your html triggered by the click of a button

        #return JsonResponse('<img src="data:image/png;base64,%s" />' % encoded_img, safe=False)

    def snapshot(self, filename="tmp.png"):
        """
        Take a screenshot and save it to `tmp.png` filename by default

        Args:
            filename: name of file where to store the screenshot

        Returns:
            display the screenshot

        """
        w, h = (600, 400)
        dsp = display.Display()
        root = dsp.screen().root
        raw = root.get_image(0, 0, w, h, X.ZPixmap, 0xffffffff)
        image = PIL.Image.frombytes("RGB", (w, h), raw.data, "raw", "BGRX")
        image = pil_2_cv2(image)
        return image

    def do(self):
        return self.getimage()

