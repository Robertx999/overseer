<script lang="ts">
	// import '@material/web/button/filled-button.js';
	// import '@material/web/button/outlined-button.js';
	// import '@material/web/checkbox/checkbox.js';
	// import '@material/web/switch/switch.js';
</script>

<div
	class="flex min-w-full basis-1/4 flex-row flex-wrap content-start items-start justify-start gap-6"
>
	<form action="upload.php" method="post" enctype="multipart/form-data" target="dummyframe">
		Select image to upload:
		<input type="file" name="imageFile" />
		<input type="submit" value="Upload Image" name="submit" />
	</form>
</div>
