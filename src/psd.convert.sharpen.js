PsdReader.prototype.sharpen = function(ctx, mix) {

	mix = typeof mix === "number" ? mix :0.5;

	var weights = new Int8Array([0, -1, 0, -1, 5, -1, 0, -1, 0]),
		katet = Math.round(Math.sqrt(weights.length)),
		half = (katet * 0.5) |0,
		w = ctx.canvas.width,
		h = ctx.canvas.height,
		dstData = ctx.createImageData(w, h),
		dstBuff = dstData.data,
		srcBuff = ctx.getImageData(0, 0, w, h).data,
		mix1 = 1 - mix,
		y = h;

	while(y--) {

		x = w;

		while(x--) {

			var sx = x,
				dstOff = (y * w + x) << 2,
				r = 0, g = 0, b = 0;

			for (var cy = 0; cy < katet; cy++) {
				for (var cx = 0; cx < katet; cx++) {

					var scy = y + cy - half;
					var scx = sx + cx - half;

					if (scy >= 0 && scy < h && scx >= 0 && scx < w) {

						var srcOff = (scy * w + scx) << 2;
						var wt = weights[cy * katet + cx];

						r += srcBuff[srcOff] * wt;
						g += srcBuff[srcOff + 1] * wt;
						b += srcBuff[srcOff + 2] * wt;
					}
				}
			}

			dstBuff[dstOff]     = r * mix + srcBuff[dstOff    ] * mix1;
			dstBuff[dstOff + 1] = g * mix + srcBuff[dstOff + 1] * mix1;
			dstBuff[dstOff + 2] = b * mix + srcBuff[dstOff + 2] * mix1;
			dstBuff[dstOff + 3] = srcBuff[dstOff + 3];
		}
	}

	ctx.putImageData(dstData, 0, 0);
};