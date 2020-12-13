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

class CalculadoraCientifica extends CalculadoraBasica {
    public function parentesisIzq()
    {
        $this->almacenar('(');
    }

    public function parentesisDcho()
    {
        $this->almacenar(')');
    }

    public function sin()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(sin($float));
    }

    public function cos()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(cos($float));
    }

    public function tan()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(tan($float));
    }

    public function asin()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(asin($float));
    }

    public function acos()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(acos($float));
    }

    public function atan()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(atan($float));
    }

    public function cot()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(eval(1/tan($float)));
    }

    public function csc()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(eval(1/sin($float)));
    }

    public function ans()
    {
        $_SESSION['memoria'] = $this->ans;
    }

    public function sec()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(eval(1/cos($float)));
    }

    public function exp()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(exp($float));
    }

    public function log()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(log10($float));
    }

    public function ln()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(log($float));
    }

    public function sqrt()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(sqrt($float));
    }

    public function abs()
    {
        $float = floatval($_SESSION['memoria']);
        $this->limpiar();
        $this->almacenar(abs($float));
    }

    public function random()
    {
        $this->limpiar();
        $this->almacenar(lcg_value());
    }

    public function euler()
    {
        $this->limpiar();
        $this->almacenar(M_E);
        $this->ans = M_PI;
    }

    public function pi()
    {
        $this->limpiar();
        $this->almacenar(M_PI);
        $this->ans = M_PI;
    }
}

$calculadora = new CalculadoraCientifica();

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
    else if(isset($_POST['(']))
        $calculadora->parentesisIzq();
    else if(isset($_POST[')']))
        $calculadora->parentesisDcho();
    else if(isset($_POST['sin']))
        $calculadora->sin();
    else if(isset($_POST['cos']))
        $calculadora->cos();
    else if(isset($_POST['tan']))
        $calculadora->tan();
    else if(isset($_POST['asin']))
        $calculadora->asin();
    else if(isset($_POST['acos']))
        $calculadora->acos();
    else if(isset($_POST['atan']))
        $calculadora->atan();
    else if(isset($_POST['cot']))
        $calculadora->cot();
    else if(isset($_POST['csc']))
        $calculadora->csc();
    else if(isset($_POST['ans']))
        $calculadora->ans();
    else if(isset($_POST['sec']))
        $calculadora->sec();
    else if(isset($_POST['exp']))
        $calculadora->exp();
    else if(isset($_POST['log']))
        $calculadora->log();
    else if(isset($_POST['ln']))
        $calculadora->ln();
    else if(isset($_POST['sqrt']))
        $calculadora->sqrt();
    else if(isset($_POST['abs']))
        $calculadora->abs();
    else if(isset($_POST['ran']))
        $calculadora->random();
    else if(isset($_POST['e']))
        $calculadora->euler();
    else if(isset($_POST['pi']))
        $calculadora->pi();
}

?>

<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <title>Calculadora</title>
    <link rel='stylesheet' href='CalculadoraCientifica.css'/>
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

        <input type="submit" name="sin" value="sin">
        <input type="submit" name="cos" value="cos">
        <input type="submit" name="tan" value="tan">
        <input type="submit" name="sec" value="sec">
        <input type="submit" name="cot" value="cot">

        <input type="submit" name="asin" value="asin">
        <input type="submit" name="acos" value="acos">
        <input type="submit" name="atan" value="atan">
        <input type="submit" name="exp" value="exp">
        <input type="submit" name="csc" value="csc">

        <input type="submit" name="log" value="log">
        <input type="submit" name="ln" value="ln">
        <input type="submit" name="sqrt" value="√">
        <input type="submit" name="abs" value="||">
        <input type="submit" name="ran" value="Ran">

        <input type='submit' name='mrc' value='MRC' />
        <input type='submit' name='m-' value='M-' />
        <input type='submit' name='m+' value='M+' />
        <input type='submit' name='e' value='e' />
        <input type='submit' name='pi' value='pi' />

        <input type='submit' name='7' value='7' />
        <input type='submit' name='8' value='8' />
        <input type='submit' name='9' value='9' />
        <input type='submit' name='(' value='(' />
        <input type='submit' name=')' value=')' />

        <input type='submit' name='4' value='4' />
        <input type='submit' name='5' value='5' />
        <input type='submit' name='6' value='6' />
        <input type='submit' name='*' value='*' />
        <input type='submit' name='/' value='/' />

        <input type='submit' name='1' value='1' />
        <input type='submit' name='2' value='2' />
        <input type='submit' name='3' value='3' />
        <input type='submit' name='+' value='+' />
        <input type='submit' name='-' value='-' />

        <input type='submit' name='0' value='0' />
        <input type='submit' name='punto' value='.' />
        <input type='submit' name='c' value='C' />
        <input type='submit' name='ans' value='Ans' />
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
