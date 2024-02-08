#!/usr/local/bin/php

<?php

include_once("../../db_connect.php");

$mysqli = new mysqli($host, $username, $password, $db_name);
mysqli_set_charset($mysqli, "utf8mb4");

if(mysqli_connect_errno()) {
    echo "Error: Could not connect to database.";
    exit;
}

// Vérifier si l'ID du produit est présent dans la requête POST
if (isset($_POST['product_id']) && isset($_POST['new_reference'])) {
    $product_id = $_POST['product_id'];
    $new_reference = $_POST['new_reference'];

    // Préparer la requête SQL pour mettre à jour la colonne reference pour le produit donné
    $query = "UPDATE ps_product SET reference = ? WHERE id_product = ?";
    
    // Préparer la déclaration SQL
    if ($stmt = $mysqli->prepare($query)) {
        // Lier les paramètres à la déclaration préparée
        $stmt->bind_param("si", $new_reference, $product_id);

        // Exécuter la déclaration
        if ($stmt->execute()) {
            echo "La référence du produit a été mise à jour avec succès.";
        } else {
            echo "Erreur lors de la mise à jour de la référence du produit.";
        }

        // Fermer la déclaration
        $stmt->close();
    } else {
        echo "Erreur lors de la préparation de la requête SQL.";
    }
} else {
    echo "ID du produit ou nouvelle référence non fourni.";
}

// Fermer la connexion à la base de données
$mysqli->close();

?>