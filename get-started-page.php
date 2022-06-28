<?php

if (isset($_POST['submit'])) {
    $email = $_POST['email-form'];
    echo "Submitted email: " . $email;
}