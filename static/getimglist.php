<?php
// if ($method === 'GET') {
// 	$dir = 'uploads/';
// 	$files = scandir($dir);
// 	foreach ($files as $img){
// 		$path = $dir . $img;
// 		if ( is_file($path) ){
// 			$list[] = $path
// 		}
// 	}
// 	header('Content-Type: application/json; charset=utf-8');
// 	send_response([
// 		'status' => 'success',
// 		'message' => json_encode($list),
// 	]);
// }
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$dir = 'uploads/';
$files = scandir($dir);
foreach ($files as $img){
	$path = $dir . $img;
	if ( is_file($path) ){
		$result['paths'][] = $path;
	}
}
$result['status'] = 'success';
http_response_code(200);
echo json_encode($result);
// if(isset($_GET)) {
// 	$dir = 'uploads/';
// 	$files = scandir($dir);
// 	foreach ($files as $img){
// 		$path = $dir . $img;
// 		if ( is_file($path) ){
// 			$list[] = $path
// 		}
// 	}
// 	http_response_code(200);
// 	echo `{"test": "test"}`;
//   }
?>