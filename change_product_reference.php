<?php

define('DEBUG', true);
define('PS_SHOP_PATH', 'https://seagale.fr/');
define('PS_WS_AUTH_KEY', '24UCBP8LSPL5EWHZVI2VDSZMRSU7EITZ');
require_once('PSWebServiceLibrary.php');

// Initialiser le service web PrestaShop
$webService = new PrestaShopWebservice(PS_SHOP_PATH, PS_WS_AUTH_KEY, DEBUG);
include_once("../../db_connect.php");

// Vérifier si les données nécessaires sont présentes dans la requête POST
if (isset($_POST['product_id']) && isset($_POST['new_reference'])) {
    // Récupérer les données POST
    $product_id = $_POST['product_id'];
    $new_reference = $_POST['new_reference'];

    echo "Product ID: " . $product_id . "\n";
echo "New Reference: " . $new_reference . "\n";

    // Récupérer le schéma XML pour mettre à jour le produit
    $xml_product = $webService->get(array('url' => PS_SHOP_PATH.'/api/products/'.$product_id));

    // Vérifier si le produit existe
    if (!empty($xml_product)) {
        // Remplir les données du produit dans le schéma XML
        $xml_product->product->reference = $new_reference;

        // Envoyer les données XML au web service pour mettre à jour le produit
        $opt_product = array('resource' => 'products');
        $opt_product['putXml'] = $xml_product->asXML();
        $xml_response = $webService->edit($opt_product);

        // Vérifier la réponse du web service
        if (isset($xml_response->product->id)) {
            // Le produit a été mis à jour avec succès
            $product_id = $xml_response->product->id;
            echo "Le produit avec l'ID $product_id a été mis à jour avec succès.";
        } else {
            // Une erreur s'est produite lors de la mise à jour du produit
            echo "Erreur lors de la mise à jour du produit.";
        }
    } else {
        // Le produit n'existe pas
        echo "Le produit avec l'ID $product_id n'existe pas.";
    }
} else {
    // Les données nécessaires ne sont pas présentes dans la requête POST
    echo "ID du produit ou nouvelle référence non fournis.";
}
?>
