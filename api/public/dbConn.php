<?php
$conn=mysqli_connect("localhost","root","root","testDB");

if(!$conn)
{
die("Connection failed: " . mysqli_connect_error());
}

$acentos = mysqli_query($conn,"SET NAMES 'utf8'");