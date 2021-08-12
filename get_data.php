<?php

$url = $_GET['target'];
$options = array(
    'http' => array(
        'method' => 'GET',
        'header' => 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/90.0'
    )
);
$context = stream_context_create($options);
$html = file_get_contents($url, false, $context);

$dom = new DOMDocument();

function getMetas($dom, $html)
{
    $dom->loadHTML($html);
    $result = array();
    foreach ($dom->getElementsByTagName('meta') as $meta) {
        $property = $meta->getAttribute('property');
        $content = $meta->getAttribute('content');
        $result[$property] = $content;
    }

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

@getMetas($dom, $html);
