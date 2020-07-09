<?php 

/* https://api.telegram.org/bot1354953600:AAGfg525_O7qTeE8pkCkQ7RnZOPlgVpYc0s/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['comment'];
$token = "1354953600:AAGfg525_O7qTeE8pkCkQ7RnZOPlgVpYc0s";
$chat_id = "-419553572";
$arr = array(
	'Имя пользователя: ' => $name,
	'Телефон: ' => $phone,
	'Комментарии: ' => $text
  );
  
  foreach($arr as $key => $value) {
	$txt .= "<b>".$key."</b> ".$value."%0A";
  };
  
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: Thanks.html');
} else {
  echo "Error";
}


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'kharkovm7@gmail.com';                 // Наш логин
$mail->Password = '123massage';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('kharkovm7@gmail.com', 'Massage');   // От кого письмо 
$mail->addAddress('alex.sherbina.work@gmail.com');     // Add a recipient
$mail->addAddress('vladibar87@gmail.com');
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	Комментарий: ' . $text . ' ';
	


if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>