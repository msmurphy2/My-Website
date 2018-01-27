
<?php
include('menuBar.html');
echo '<html>
<head>

<title>Artificial Intelligence</title>
    <link rel="stylesheet" href="menu.css" />
  	
 </head>
<link rel="stylesheet" href="body.css" />
	<h1 id="AI">Artificial Intelligence</h1>
	<div class = "box">
	<p>​Artificial Intelligence is the science of making intelligent computer programs. This course is an excellent example of a challenging independent learning experience. The programming projects in this course combined Java, Processing, and XML to help us undertand the basics of artificial intelligence and how we can create programs (almost) as intelligent as humans.
	</p>
	<img src="ai.jpg" style="width: 85%" align="middle"; />​
	</div>
​	<ul>
		<br/><br/>
		<div class = "oneFile">
			<a class="button" href="https://gist.github.com/msmurphy2/e1ba68aab3dc7ff9439aff1ae2505063" target="_blank" >
				boxes.java
			</a>​<br/>
			
			<div class = "txtbox">
				<ul>
					Reads in XML data from a file which tells where to draw boxes in order to display a smiley face on the screen.
				</ul>
			</div>
		</div>
		<div class = "oneFile">
			<a class="button" href="https://gist.github.com/msmurphy2/37e9aeec2b59eb56f2bec5803f57bb0e" target="_blank" >
				aStar.java
			</a>​<br/>
			
			<div class = "txtbox">
			<ul>
				AStar Heuristic Search on a map. Incorporates three types of heuristics: zero heuristic, manhattan distance heuristic, and standard Euclidean L2 straight line distance heuristic.
			</ul>
			</div>
		</div>
		<div class = "oneFile">
			<a class="button" href="https://gist.github.com/msmurphy2/cd12a96a1c5ff7ed6eb661b1a14aaf7a" target="_blank" >
				resolution.java
			</a>​<br/>
			<div class = "txtbox">
			<ul>
				Converts a propositional logic statement into conjunctive normal form and then performs resolution to detect and report any resulting conflicts.
			</ul>
			</div>
		</div>
		<br/>
	</ul>
	</body>
</html>';
?>