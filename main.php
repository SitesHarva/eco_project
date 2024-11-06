<?php

session_start();
header('Content-Type: application/json');

if(!isset($_SESSION['log']) || $_SESSION['log'] !== true) {
    echo json_encode(['error' => 'Не авторизований']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$user_id = $_SESSION['user_id'];
// echo json_encode(['error' => $user_id]);
try {
    $conn = new PDO("mysql:host=localhost;dbname=eco", 'root', '');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if($method === 'GET') {
        $query = $conn->prepare('SELECT * FROM tips WHERE user_id = :user_id');
        $query->bindParam(':user_id', $user_id);
        $query->execute();
    
        $tips = [];
        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $tips[] = $row;
        }
        echo json_encode(['tips' => $tips]);
    } 
    else if ($method === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        if(!isset($data['id'], $data['text'], $data['taken'])) {
            echo json_encode(['error' => 'помилка']);
            exit;
        }
        // echo json_encode(['success' => $data]);
        $tip_id = $data['id'];
        $tip_text = $data['text'];
        $tip_taken = $data['taken'];
        
        if(empty($tip_id) || empty($tip_text)) {
            echo json_encode(['error' => 'помилка']);
            exit;
        }
        $sql = $conn->prepare('UPDATE tips SET text = :text, taken = :taken WHERE id = :id');
        $sql->bindParam(':text', $tip_text);
        $sql->bindParam(':taken', $tip_taken);
        $sql->bindParam(':id', $tip_id);
        $sql->execute();

        echo json_encode(['success' => true]);

    } else {
        echo json_encode(['error'  => 'метод не підтримується']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => 'error:' . $e->getMessage()]);
}

?>