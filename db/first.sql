INSERT INTO `articles`(`title`, `date`, `comments`, `directory`) VALUES 
	('City_of_Cape_Town_Water_By_law_2010','17-02-2017','[]','docs/City_of_Cape_Town_Water_By_law_2010.html');

INSERT INTO `articles`(`title`, `date`, `comments`, `directory`) VALUES 
('City_of_Cape_Town_City_Ombudsman_By_law_2015','17-02-2017','[]','docs/City_of_Cape_Town_City_Ombudsman_By_law_2015.html');


UPDATE articles SET comments='[ { "user": "Denver", "comment": "test comment", "date":"17-02-2017" } ]' WHERE title='City_of_Cape_Town_Water_By_law_2010';

select title from articles where title='City_of_Cape_Town_Water_By_law_2010';