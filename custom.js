let canvas = new fabric.Canvas("canvas", {
  width: 800,
  height: 700,
  backgroundColor: "blue",
});

document.getElementById("uploadImg").onchange = (e) => {
  var reader = new FileReader();
  reader.onload = function (e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function () {
      var img = new fabric.Image(image);
      img.set({
        left: canvas.width / 3,
        top: canvas.height / 3,
      });
      img.scaleToWidth(300);
      canvas.add(img).setActiveObject(img).renderAll();
    };
    canvas.on("mouse:wheel", function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 1) {
        zoom = 1;
        var img = canvas.getActiveObject();
        canvas.remove(img);
        canvas.centerObject(img);
        canvas.setActiveObject(img);
        canvas.add(img);
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

        canvas.renderAll();
      }
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  };
  reader.readAsDataURL(e.target.files[0]);
};

canvas.requestRenderAll();
