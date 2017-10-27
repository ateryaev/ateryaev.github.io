<?php
require '../../Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$db = new SQLite3('game.db');
createDB();

function generateRandomString($length = 16) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

function createDB() {
    global $db;
    $query = "CREATE TABLE IF NOT EXISTS users (user_id TEXT PRIMARY KEY NOT NULL, created_on DATETIME DEFAULT CURRENT_TIMESTAMP)"; 
    $db->query($query);
    $query = "CREATE TABLE IF NOT EXISTS choices (choice_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, choice CHAR(1), created_on DATETIME DEFAULT CURRENT_TIMESTAMP)"; 
    $db->query($query);
}

//234:5pePeY5nbNg0SZn6
function selectLastResult($user_id) {
    global $db;
    $sql  = ' SELECT c2.user_id answer_by, MAX(c2.created_on,c1.created_on) created_on, c1.choice choice, c2.choice answer';
    $sql .= ' FROM choices c1 LEFT OUTER JOIN choices c2 ';
    $sql .= ' ON (c1.choice_id = c2.choice_id-1 AND c1.choice_id%2=1)';
    $sql .= ' OR (c1.choice_id = c2.choice_id+1 AND c1.choice_id%2=0)';
    $sql .= ' WHERE c1.user_id = :userid';
    $sql .= ' ORDER BY c1.choice_id DESC LIMIT 200';

    $stmt = $db->prepare($sql);
    $stmt->bindValue(':userid', $user_id);//'234:5pePeY5nbNg0SZn6');
    $result = $stmt->execute();
    //while($res = $result->fetchArray(SQLITE3_ASSOC)){ 
    //     print_r ($res);
    //}
    
    $row = array(); 
    $i = 0; 
    
    while($res = $result->fetchArray(SQLITE3_ASSOC)){ 
         //if(!isset($res['user_id'])) continue; 
        $row[$i]['choice'] = $res['choice']; 
        $row[$i]['answer'] = $res['answer']; 
        $row[$i]['answer_by'] = $res['answer_by']?explode(":", $res['answer_by'])[0]:null; 
        $row[$i]['created_on'] = $res['created_on']; 
        $i++; 
     } 

    return $row;

}
//print_r(selectLastResult("000:sIuYR3EVGCvpVp3y"));
//exit();

function checkUserExists($user_id) {
    global $db;
    $stmt = $db->prepare('SELECT COUNT(user_id) FROM users WHERE user_id=:userid');
    $stmt->bindValue(':userid', $user_id, SQLITE3_TEXT);
    $result = $stmt->execute()->fetchArray();
    return ($result[0] > 0);
}

function insertUser($user_id) {
    global $db;
    $stmt = $db->prepare('INSERT INTO users (user_id) VALUES (:userid)');
    $stmt->bindValue(':userid', $user_id, SQLITE3_TEXT);
    $stmt->execute();
}

function insertPlay($user_id, $choice) {
    global $db;
    $stmt = $db->prepare('INSERT INTO choices (user_id, choice) VALUES (:userid, :choice)');
    $stmt->bindValue(':userid', $user_id, SQLITE3_TEXT);
    $stmt->bindValue(':choice', $choice, SQLITE3_TEXT);
    $stmt->execute();
}

////////////////////////////////////////////////////////////////////

function createUser($username) {
    $userid = "$username:".generateRandomString();
    if (checkUserExists($userid)) {
        createUser($username);
    }
    else
    {
        insertUser($userid);
        echo json_encode(array('status' => 'OK', 'userid' => $userid));
    }
}

function postPlay($user_id, $choice) {
    if (!checkUserExists($user_id))
    {
        echo json_encode(array('status' => 'LOGIN ERROR'));
        return;
    }
    
    $result = selectLastResult($user_id);
    
    if (count($result) > 0 && $result[0]['answer']==null) {
        echo json_encode(array( 'status' => 'ALREADY PLAYING ERROR', 
                                'userid' => $user_id, 'results' => $result));
        return;
    }
    
    insertPlay($user_id, $choice);
    
    getLastResult($user_id);
}

function getLastResult($user_id) {

    if (!checkUserExists($user_id))
    {
        echo json_encode(array('status' => 'LOGIN ERROR', 'userid' => $user_id));
        return;
    }
    
    $result = selectLastResult($user_id);
    echo json_encode(array('status' => 'OK', 'userid' => $user_id, 'results' => $result));
}

////////////////////////////////////////////////////////////////////

$app = new \Slim\Slim();

$app->get('/user/:username', function ($username) {
    createUser($username);
});

$app->get('/play/:userid/:choice', function ($userid, $choice) {
    postPlay($userid, $choice);
});

$app->get('/result/:userid', function ($userid) {
    getLastResult($userid);
});

$app->run();
// header('Access-Control-Allow-Origin: *'); 
// echo  $_SERVER['REQUEST_URI'];

// phpinfo();
?>