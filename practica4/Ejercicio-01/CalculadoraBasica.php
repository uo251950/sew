<?php
session_start();

if(!isset($_SESSION['resultado']))
    $_SESSION['resultado'] = 0;
if(!isset($_SESSION['memoria']))
    $_SESSION['memoria'] = 0;

class CalculadoraBasica
{
    public $pantalla;
    private $memoria;
    protected $ans;
    private $acabaDeOperar;
    private $mc;

    public function __construct()
    {
        $this->pantalla = 0;
        $this->memoria = array();
        $this->ans = 0;
        $this->acabaDeOperar = false;
        $this->mc = 0;
    }

    public function getStringMemoria()
    {
        return implode($this->memoria);
    }

    public function almacenar($dato)
    {
        if($this->isEstadoInicial())
        {
            if($dato === '.')
            {
                $_SESSION['memoria'] .= 0;
                $_SESSION['memoria'] .= '.';
            }
            else
                $_SESSION['memoria'] .= $dato;
        }
        else
            $_SESSION['memoria'] .= $dato;
    }

    public function limpiar()
    {
        $this->memoria = array();
        $this->ans = 0;
        $_SESSION['memoria'] = "";
        $_SESSION['resultado'] = 0;
    }

    private function isEstadoInicial()
    {
        return empty($_SESSION['memoria']);
    }

    public function resolver()
    {
        try
        {
            $this->ans = eval('return '.$_SESSION['memoria'].';');
            $_SESSION['resultado'] = $this->ans;
        }
        catch (DivisionByZeroError $e)
        {
            $_SESSION['resultado'] = "Div by 0";
        }
        catch (ParseError $e)
        {
            $_SESSION['resultado'] = "SYNTAX Error";
        }
        catch (Exception) {}
    }

    public function mrc()
    {
        //$_SESSION['memoria'] = $this->getStringMemoria();
    }

    public function mMas()
    {
        //$this->mc += $_SESSION['memoria'];
    }

    public function mMenos()
    {
        //$this->mc -= $_SESSION['memoria'];
    }
}
$calculadora = new CalculadoraBasica();

if (count($_POST) > 0) {
    if(isset($_POST['1']))
        $calculadora->almacenar(1);
    else if(isset($_POST['2']))
        $calculadora->almacenar(2);
    else if(isset($_POST['3']))
        $calculadora->almacenar(3);
    else if(isset($_POST['4']))
        $calculadora->almacenar(4);
    else if(isset($_POST['5']))
        $calculadora->almacenar(5);
    else if(isset($_POST['6']))
        $calculadora->almacenar(6);
    else if(isset($_POST['7']))
        $calculadora->almacenar(7);
    else if(isset($_POST['8']))
        $calculadora->almacenar(8);
    else if(isset($_POST['9']))
        $calculadora->almacenar(9);
    else if(isset($_POST['0']))
        $calculadora->almacenar(0);
    else if(isset($_POST['+']))
        $calculadora->almacenar('+');
    else if(isset($_POST['-']))
        $calculadora->almacenar('-');
    else if(isset($_POST['*']))
        $calculadora->almacenar('*');
    else if(isset($_POST['/']))
        $calculadora->almacenar('/');
    else if(isset($_POST['punto']))
        $calculadora->almacenar('.');
    else if(isset($_POST['c']))
        $calculadora->limpiar();
    else if(isset($_POST['=']))
        $calculadora->resolver();
    else if(isset($_POST['mrc']))
        $calculadora->mrc();
    else if(isset($_POST['m+']))
        $calculadora->mMas();
    else if(isset($_POST['m-']))
        $calculadora->mMenos();
}

?>

<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Calculadora</title>
    <link rel='stylesheet' href='CalculadoraBasica.css'/>
</head>
<body>
<header>
    <h1>Calculadora básica</h1>
</header>
<main>
    <form action='#' method='post'>
        <?php
        $memoria = $_SESSION['memoria'];
        $resultado = $_SESSION['resultado'];
        echo "<p class='pantalla'>$memoria</p>";
        echo "<p class='pantalla'>$resultado</p>";
        ?>

        <input type='submit' name='mrc' value='MRC' />
        <input type='submit' name='m-' value='M-' />
        <input type='submit' name='m+' value='M+' />
        <input type='submit' name='/' value='/' />

        <input type='submit' name='7' value='7' />
        <input type='submit' name='8' value='8' />
        <input type='submit' name='9' value='9' />
        <input type='submit' name='*' value='*' />

        <input type='submit' name='4' value='4' />
        <input type='submit' name='5' value='5' />
        <input type='submit' name='6' value='6' />
        <input type='submit' name='-' value='-' />

        <input type='submit' name='1' value='1' />
        <input type='submit' name='2' value='2' />
        <input type='submit' name='3' value='3' />
        <input type='submit' name='+' value='+' />

        <input type='submit' name='0' value='0' />
        <input type='submit' name='punto' value='.' />
        <input type='submit' name='c' value='C' />
        <input type='submit' name='=' value='=' />
    </form>
</main>
<footer>
    <!-- Iconos de validación W3C -->
    <a href='https://validator.w3.org/check?uri=referer' target='_blank'>
        <img src='https://www.w3.org/html/logo/badge/html5-badge-h-solo.png' alt='¡HTML5 válido!' />

    </a>
    <a href=' http://jigsaw.w3.org/css-validator/check/referer ' target='_blank'>
        <img src=' http://jigsaw.w3.org/css-validator/images/vcss' alt='¡CSS3 válido!' />
    </a>
</footer>
</body>
</html>