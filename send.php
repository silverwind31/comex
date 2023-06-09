<?php
    require_once 'assets/PHPMailer/Exception.php';
    require_once 'assets/PHPMailer/PHPMailer.php';
    require_once 'assets/PHPMailer/SMTP.php';

    function clear_data($val){
        $val = trim($val);
        $val = stripslashes($val);
        $val = htmlspecialchars($val);
        return $val;
    };
    if(!empty($_POST)){
        $form_type = $_POST['form_type'];
        if($form_type == 'contacts_form'){
            $name = clear_data($_POST["name"]);   
            $phone = clear_data($_POST["phone"]);
            $email = clear_data($_POST["email"]);
            $max_height = clear_data($_POST['max_height']);
            $type_of_cargo = clear_data($_POST['type_of_cargo']);
            $type_of_transport = clear_data($_POST['type_of_transport']);
        }else if($form_type == 'modal_order'){
            $phone = clear_data($_POST["phone"]);
            $name = clear_data($_POST["name"]);
            $email = clear_data($_POST["email"]);
            $title = clear_data($_POST["title"]);
        }
    };
    
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

try {
    //Server settings
    $mail->SMTPDebug = false;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.yandex.ru';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = '';                     //SMTP username
    $mail->Password   = '';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('', 'status');
    $mail->addAddress('', 'check');     //Add a recipient
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

//    //Attachments
//    $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
//    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Заявка';
    if($form_type == 'contacts_form'){
        $mail ->Body = "
        <table border='1' cellpadding='6' cellspacing='0' width='90%' bordercolor = '#DBDBDB'>
        <tr>
            <td colspan='2' align='center' bgcolor='#E4E4E4'>
                <b>Информация о заявке (страница - контакты)</b>
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Имя клиента
                </b>
            </td>
            <td>
                {$name}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Номер телефона
                </b>
            </td>
            <td>
                {$phone}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Email
                </b>
            </td>
            <td>
                {$email}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Вес груза
                </b>
            </td>
            <td>
                {$max_height}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                Тип груза
                </b>
            </td>
            <td>
                {$type_of_cargo}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Тип перевозки
                </b>
            </td>
            <td>
                {$type_of_transport}
            </td>
        </tr>
    </table>
        ";
    }else if($form_type == 'modal_order'){
        $mail-> Body = "
        <table border='1' cellpadding='6' cellspacing='0' width='90%' bordercolor = '#DBDBDB'>
        <tr>
            <td colspan='2' align='center' bgcolor='#E4E4E4'>
                <b>Информация о заявке (модальное окно)</b>
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Имя клиента
                </b>
            </td>
            <td>
                {$name}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Email
                </b>
            </td>
            <td>
                {$email}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                    Номер телефона
                </b>
            </td>
            <td>
                {$phone}
            </td>
        </tr>
        <tr>
            <td>
                <b>
                   Текст
                </b>
            </td>
            <td>
                {$title}
            </td>
        </tr>
    </table>
        ";
    }
    $mail->AltBody = 'ПРОВЕРКА';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

