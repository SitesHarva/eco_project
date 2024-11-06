<?php
session_start();
header('Content-Type: application/json');


const DB_HOST = 'localhost';
const DB_NAME = 'eco';
const DB_USER = 'root';
const DB_PASS = '';

// function createDataBaseAndTable() {
//     try{
//         $db = new PDO('mysql:host=' . DB_HOST, DB_USER, DB_PASS);
//         $db->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME);
//         $db->exec("USE " . DB_NAME);
//         $db->exec("CREATE TABLE IF NOT EXISTS users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(255) NOT NULL UNIQUE,
//             password VARCHAR(255) NOT NULL
//         )");
//         $db->exec("CREATE TABLE IF NOT EXISTS tips (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_id INT,
//             text TEXT,
//             max INT,
//             taken BOOLEAN,
//             FOREIGN KEY (user_id) REFERENCES users(id)
//         )");
//     } catch(PDOException $e) {
//         echo 'Помилка: ' . $e->getMessage();
//         exit();
//     }
// }
// createDataBaseAndTable();


$data = json_decode(file_get_contents('php://input'), true);
$userName = $data['userName'];
$userPass = $data['userPass'];
$userCount = $data['userCount'];

$tips = [
    ['text' => 'Використовуйте багаторазові сумки замість пластикових.', 'max' => 19],
    ['text' => 'Сортуйте сміття: пластик, папір, скло.', 'max' => 19],
    ['text' => 'Зменшуйте використання води під час прийому душу.', 'max' => 19],
    ['text' => 'Вимикайте світло в кімнатах, коли їх не використовуєте.', 'max' => 19],
    ['text' => 'Використовуйте енергоефективні лампочки.', 'max' => 19],
    ['text' => 'Підтримуйте місцевих виробників та купуйте продукти, що вирощені поблизу.', 'max' => 6],
    ['text' => 'Садіть дерева та кущі для покращення якості повітря.', 'max' => 6],
    ['text' => 'Уникайте використання одноразового посуду.', 'max' => 6],
    ['text' => 'Використовуйте екологічні засоби для чищення.', 'max' => 6],
    ['text' => 'Робіть пішохідні прогулянки або їздіть на велосипеді.', 'max' => 6],
    ['text' => 'Зменшуйте споживання м’яса на користь рослинних продуктів.', 'max' => 6],
    ['text' => 'Використовуйте енергію від відновлювальних джерел, якщо можливо.', 'max' => 6],
    ['text' => 'Плануйте поїздки, щоб зменшити кількість подорожей.', 'max' => 6],
    ['text' => 'Не купуйте продукти з надмірною упаковкою.', 'max' => 6],
    ['text' => 'Використовуйте фільтри для води замість пластикових пляшок.', 'max' => 6],
    ['text' => 'Установіть термостати для зменшення витрат на опалення.', 'max' => 6],
    ['text' => 'Долучайтеся до волонтерських акцій з прибирання.', 'max' => 6],
    ['text' => 'Використовуйте папір з вторинних сировин.', 'max' => 13],
    ['text' => 'Постарайтеся уникати автомобілів та використовувати громадський транспорт.', 'max' => 13],
    ['text' => 'Слідкуйте за якістю повітря у вашому регіоні.', 'max' => 13],
    ['text' => 'Збирайте дощову воду для поливу рослин.', 'max' => 13],
    ['text' => 'Зменшуйте використання електроніки, коли це можливо.', 'max' => 13],
    ['text' => 'Слідкуйте за своєю екологічною поведінкою та дійте усвідомлено.', 'max' => 13],
    ['text' => 'Використовуйте натуральні матеріали для будівництва та ремонту.', 'max' => 13],
    ['text' => 'Робіть екологічні перерви: гуляйте на свіжому повітрі.', 'max' => 13],
    ['text' => 'Навчайте дітей основам екологічної свідомості.', 'max' => 13],
    ['text' => 'Спостерігайте за птахами та природою у своєму районі.', 'max' =>13],
];

try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = $conn->prepare("SELECT id, password FROM users WHERE username = :username");
    $sql->bindParam(":username", $userName);
    $sql->execute();

    if($sql->rowCount() > 0) {
        $user = $sql->fetch(PDO::FETCH_ASSOC);
        if(password_verify($userPass, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['log'] = true;
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Неправильний пароль']);
        }
    } else {
        $password = password_hash($userPass, PASSWORD_DEFAULT);
        $query = $conn->prepare('INSERT INTO users (username, password) VALUES (:username, :password)');
        $query->bindParam(':username', $userName);
        $query->bindParam(':password', $password);
        $query->execute();


        $_SESSION['log'] = true;
        $userId = $conn->lastInsertId();
        $_SESSION['user_id'] = $userId;

        $filteredTips = array_filter($tips, function($tip) use ($userCount) {
            return $tip['max'] >= $userCount;
        });
        foreach($filteredTips as $tip) {
            $sql = $conn->prepare("INSERT INTO tips (user_id, text, max, taken) VALUES (:user_id, :text, :max, 0)");
            $sql->bindParam(':user_id', $userId);
            $sql->bindParam(':text', $tip['text']);
            $sql->bindParam(':max', $tip['max']);
            $sql->execute();
        }
        echo json_encode(['success' => true]);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Помилка: ' . $e->getMessage()]);
}


?>