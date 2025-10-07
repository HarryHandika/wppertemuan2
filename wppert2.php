<?php
class iniprivasilol {
    public $username;
    public $passwo;

    public function detail($username, $passwo) {
        $this->userna = $username;
        $this->psw = $passwo;
    }

    public function givingdetail() {
        echo "username: " . $this->userna;
        echo "password: " . $this->psw;
    }
}

$mydetail = new iniprivasilol();
$mydetail->detail("anomali", "123456");
$mydetail->givingdetail();