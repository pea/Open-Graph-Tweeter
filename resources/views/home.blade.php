<!DOCTYPE html>
<html>
    <head>
        <title>Getog</title>
        <link rel="stylesheet" href="<?php echo asset('public/css/prod/main.css'); ?>">
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
    </head>
    <body>
        
        <?php if(Session::get('access_token')){ ?>
            
        <?php } ?>
        
        <div id="wrapper"></div>
        
        <script>
            var config = {
                csrf: '<?php echo csrf_token(); ?>',
                authenticated: <?php echo Session::get('access_token') ? 'true' : 'false'; ?>
            }
        </script>
        
        <script src="<?php echo asset('public/js/lib/jquery.js'); ?>"></script>
        <script src="https://fb.me/react-0.14.1.min.js"></script>
        <script src="https://fb.me/react-dom-0.14.1.min.js"></script>
        <script src="<?php echo asset('public/js/prod/main.js'); ?>"></script>
        
    </body>
</html>
