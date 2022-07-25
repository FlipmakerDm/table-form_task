
<?php 
$data = file_get_contents("php://input");

if ($data){
  $data = json_decode($data, true);
  http_response_code(200);
  echo json_encode(array("message" => true), JSON_UNESCAPED_UNICODE); 
}
else {
  http_response_code(400);
  echo json_encode(array("message" => false), JSON_UNESCAPED_UNICODE);
}

?>

