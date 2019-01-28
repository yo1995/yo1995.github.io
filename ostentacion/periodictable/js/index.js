var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [], cube:[] };
var delay = 2000;

function run() {
	init();
	animate();
}

function init() {

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 3000;

  scene = new THREE.Scene();

  // table

  for ( var i = 0; i < table.length; i += 7 ) {
	
    var element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
	
	var img = document.createElement( 'img' );
	img.src = table[ i + 6 ];
	element.appendChild( img );
	
	var card = document.createElement( 'div' );
	card.className = 'element-card';
	element.appendChild( card );
	
	var elehref = document.createElement( 'a' );
	elehref.className = 'animsition-link';
	elehref.href = table[ i + 5 ];
	card.appendChild( elehref );

    var number = document.createElement( 'div' );
    number.className = 'number';
	number.textContent = (i/7) + 1;
    card.appendChild( number );

    var symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = table[ i ];
    card.appendChild( symbol );

    var details = document.createElement( 'div' );
    details.className = 'details';
    details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
    card.appendChild( details );

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add( object );

    objects.push( object );
	
	

    var object = new THREE.Object3D();
    object.position.x = ( table[ i + 3 ] * 140 ) - 1260;
    object.position.y = - ( table[ i + 4 ] * 180 ) + 990;

    targets.table.push( object );

  }
  

  // special handling of La and Ac
  for ( var i = 0; i < LaAc.length; i += 7 ) {

    var element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';
	
	var card = document.createElement( 'div' );
	card.className = 'element-card';
	element.appendChild( card );
	
	// maybe click to open in the future
	// var elehref = document.createElement( 'a' );
	// elehref.className = 'link';
	// elehref.href = LaAc[ i + 5 ];
	// element.appendChild( elehref );

    var number = document.createElement( 'div' );
    number.className = 'number';
	if (((i/7) + 1) === 1 ) {
		number.textContent = "57-71";  // magic number...
	}
	else if (((i/7) + 1) === 2 ) {
		number.textContent = "89-103";  // magic number again...
	}
    else {
	}
    card.appendChild( number );

    var symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = LaAc[ i ];
    card.appendChild( symbol );

    var details = document.createElement( 'div' );
    details.className = 'details';
    details.innerHTML = LaAc[ i + 1 ] + '<br>' + LaAc[ i + 2 ];
    card.appendChild( details );

    var object = new THREE.CSS3DObject( element );
    object.position.x = Math.random() * 4000 - 2000;
    object.position.y = Math.random() * 4000 - 2000;
    object.position.z = Math.random() * 4000 - 2000;
    scene.add( object );

    objects.push( object );

    var object = new THREE.Object3D();
    object.position.x = ( LaAc[ i + 3 ] * 140 ) - 1260;
    object.position.y = - ( LaAc[ i + 4 ] * 180 ) + 990;

    targets.table.push( object );
  }

  // sphere

	var vector = new THREE.Vector3();
	var spherical = new THREE.Spherical();

	for ( var i = 0, l = objects.length; i < l; i ++ ) {

		var phi = Math.acos( -1 + ( 2 * i ) / l );
		var theta = Math.sqrt( l * Math.PI ) * phi;

		var object = new THREE.Object3D();

		spherical.set( 800, phi, theta );

		object.position.setFromSpherical( spherical );

		vector.copy( object.position ).multiplyScalar( 2 );

		object.lookAt( vector );

		targets.sphere.push( object );

	}

  // helix

  var vector = new THREE.Vector3();

  for ( var i = 0, l = objects.length; i < l; i ++ ) {

    var phi = i * 0.175 + Math.PI;

    var object = new THREE.Object3D();

    object.position.x = 900 * Math.sin( phi );
    object.position.y = - ( i * 8 ) + 450;
    object.position.z = 900 * Math.cos( phi );

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt( vector );

    targets.helix.push( object );

  }

  // grid

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = new THREE.Object3D();
	// magical transformation
    object.position.x = ( ( i % 5 ) * 400 ) - 800;
    object.position.y = ( - ( Math.floor( i / 5 ) % 5 ) * 400 ) + 800;
    object.position.z = ( Math.floor( i / 25 ) ) * 400 - 400;

    targets.grid.push( object );

  }

  // cube, 20 elements on each face, 5 * 4
  
  var vector = new THREE.Vector3();
  
  const half_dim = 500;
  const gap_h = 250;  // 1000 / (5-1)
  const gap_v = 333;  // 1000 / (4-1)

  for ( var i = 0, l = objects.length; i < l; i ++ ) {
	var object = new THREE.Object3D();
	switch(i % 6) {
		case 0:
			object.position.x = -half_dim + gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.y = half_dim - gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.position.z = half_dim;
			
			break;
		case 1:
			object.position.x = -half_dim + gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.y = half_dim;
			object.position.z = -half_dim + gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.rotateX(-0.5 * Math.PI);
			break;
		case 2:
			object.position.x = -half_dim + gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.y = -half_dim + gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.position.z = 	-half_dim;
			object.rotateY(Math.PI);
			break;
		case 3:
			object.position.x = -half_dim + gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.y = -half_dim;
			object.position.z = half_dim - gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.rotateX(0.5 * Math.PI);
			break;
		case 4:
			object.position.x = -half_dim;
			object.position.y = half_dim - gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.z = half_dim - gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.rotateY(-0.5 * Math.PI);
			break;
		case 5:
			object.position.x = half_dim;
			object.position.y = -half_dim + gap_h * ((Math.floor( i / 6 )) % 5);
			object.position.z = half_dim - gap_v * (Math.floor( (Math.floor( i / 6 )) / 5 ));
			object.rotateY(0.5 * Math.PI);
			break;
		default:
			object.position.x = 0;
			object.position.y = 0;
			object.position.z = 0;
			break;
	}
	
    targets.cube.push( object );

  }
  
  // main render process
  renderer = new THREE.CSS3DRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.position = 'absolute';
  document.getElementById( 'container' ).appendChild( renderer.domElement );

  // controller settings
  controls = new THREE.TrackballControls( camera, renderer.domElement );
  controls.rotateSpeed = 1.5;
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener( 'change', render );

  var button = document.getElementById( 'table' );
  button.addEventListener( 'click', function ( event ) {
    transform( targets.table, delay );
  }, false );

  var button = document.getElementById( 'sphere' );
  button.addEventListener( 'click', function ( event ) {
    transform( targets.sphere, delay );
  }, false );

  var button = document.getElementById( 'helix' );
  button.addEventListener( 'click', function ( event ) {
    transform( targets.helix, delay );
  }, false );

  var button = document.getElementById( 'grid' );
  button.addEventListener( 'click', function ( event ) {
    transform( targets.grid, delay );
  }, false );
  
  var button = document.getElementById( 'cube' );
  button.addEventListener( 'click', function ( event ) {
    transform( targets.cube, delay );
  }, false );
  
  var button = document.getElementById( 'reset' );
  button.addEventListener( 'click', function ( event ) {
	  camera_transform( delay / 2 );
  }, false );
  
  var button = document.getElementById( 'freeze' );
  button.addEventListener( 'click', function ( event ) {
	  stop_anim();
  }, false );
  
  transform( targets.table, delay );

  window.addEventListener( 'resize', onWindowResize, false );

}

function transform( targets, duration ) {

  TWEEN.removeAll();

  for ( var i = 0; i < objects.length; i ++ ) {

    var object = objects[ i ];
    var target = targets[ i ];

    new TWEEN.Tween( object.position )
      .to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )  // less than 2*
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

    new TWEEN.Tween( object.rotation )
      .to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
      .easing( TWEEN.Easing.Exponential.InOut )
      .start();

  }

  new TWEEN.Tween( this )
    .to( {}, duration * 2 )
    .onUpdate( render )
    .start();

}

function camera_transform( duration ) {
	// TWEEN.removeAll();
	
	controls.enabled = false;

	var camera_temp = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
	camera_temp.position.z = 3000;
	
	console.log(camera.position);
	console.log(camera.rotation);
	
	console.log(camera_temp.position);
	console.log(camera_temp.rotation);
	
	new TWEEN.Tween( camera.position )
	  .to( camera_temp.position, duration )
	  .easing( TWEEN.Easing.Exponential.InOut )
	  .onUpdate( render )
	  .start();
	
	new TWEEN.Tween( camera.rotation )
	  .to( {x: camera_temp.rotation.x, y: camera_temp.rotation.y, z: camera_temp.rotation.z}, duration )
	  .easing( TWEEN.Easing.Exponential.InOut )
	  .onUpdate( render )
	  .onComplete(function () {
                    camera = camera_temp;
					controls.enabled = true;
                })
	  .start();

	controls = new THREE.TrackballControls( camera_temp, renderer.domElement );
	controls.rotateSpeed = 1.5;
	controls.minDistance = 500;
	controls.maxDistance = 6000;
	controls.addEventListener( 'change', render, false );
	
}

// helper sleep function, might not be a good practice
function sleep(d){
	for(var t = Date.now();Date.now() - t <= d;);
}

function stop_anim() {
	TWEEN.removeAll();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

function animate() {
	requestAnimationFrame( animate );
	TWEEN.update();
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}

run();