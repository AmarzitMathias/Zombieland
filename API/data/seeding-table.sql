BEGIN;
-- Permet de ne pas avoir d'erreur s'il y a des accents dans la base de donnée (windows)
set client_encoding to 'utf8';

TRUNCATE TABLE "user",
"ticket",
"tariff",
"category",
"activity",
"image";

INSERT INTO "user"
  ("id", "lastname", "firstname", "email", "role", "password")
VALUES
  ( 2, 'Test', 'Test', 'test@gmail.com', 'client', 'test' ),
  ( 1, 'Administrator', 'Administrator', 'administrator@gmail.com', 'administrator', 'administrator')
;

INSERT INTO "tariff" 
  ("id", "name", "price")
VALUES
  (1, 'Senior', 20),
  (2, 'Junior', 15)
;

INSERT INTO "ticket" 
  ("id", "date", "id_tariff", "id_user")
VALUES
  (1, '2025-03-06', 1, 2),
  (2, '2025-03-06', 2, 2)
;


INSERT INTO "category" 
  ("id", "name")
VALUES
  (1, 'Attraction'),
  (2, 'Spectacle');

INSERT INTO "activity" 
  ("id", "name", "description", "id_category")
VALUES
  (1, 'Zombie 8', 'Vous êtes au travail, un travail de bureau quelconque que vous trouvez plus que ennuyant où chaque moment de pause est une bonne raison. Vous vous retrouvez aux toilettes où vous écoutez de la musique. La musique permet de vous détendre ou du moins devrait s’il n’y avait pas autant de bruit de fond. Vous décidez de revenir à votre poste jusqu’à que vous entendiez un cri devant vous et que vous voyez votre patron se faire manger…', 1),
  (2, 'The Last Train' ,'Cela fait quelques heures depuis que vous avez entendu des nouvelles par rapport à une hausse de violence dans tout le pays. Rien de bien embêtant dans votre train-train quotidien et vous allez en gare car vous rentrez de vacances. Ce train vous emmènera-t-il à sa destination initiale ou va-t-il vous emmener dans le pire cauchemar de l’humanité ? Découvrez-le avec cette attraction qui vous emmènera dans un périple mouvementé au bord d’un train qui vous fera voir un pays qui tombe peu à peu à la destruction.', 1),
  (3, 'Zombie Apocalypse Maze' ,'Vous vous réveillez sans souvenir dans une salle ayant le plafond écroulé, vous regardez dans votre main et vous voyez un pense-bête avec écrit:  “Tu dois prendre ce qu’il y a au laboratoire et enfuis-toi”. Ayant aucun souvenir de votre passé vous vous décidez de suivre ce bout de papier sans même savoir ce qui vous attend…
Dans cette attractions vous êtes dans la peau d’un amnésique qui n’a aucune idée de ce qui se passe à l’intérieur, parcourez un labyrinthe qui représente la ville et ses alentours.En résolvant des énigmes trouvez ce dont vous êtes venu chercher et enfuyez-vous loin de cette ville qui vous veut du mal…
', 1),
  (4, 'Haunted Zombie House' ,'Vous êtes à une soirée avec vos amis, vos amis ont eu la merveilleuse idée de prendre ce fameux château abandonné que tout le monde dans la région connaît pour faire leur test de courage. Au fur et à mesure vous voyez vos amis partir à l’intérieur puis vient votre tour sauf que ce que vous ne savez pas est que ce château renferme encore de jolies secrets…
Parcourez les différentes salles de ce château abandonné et découvrez les sombres secrets qui s’y cachent dans chaque pièce… Faites attention, ce que vous voyez peut cacher une histoire plus grande…', 1),
  (5, 'Tsunami of the Dead' ,'Vous êtes en vacances, cela faisait longtemps que vous n’aviez pas été en vacances. Vous profitez au maximum, fêtes et alcool vont de paires et sont souvent là pour pimenter vos soirées. Après une insolation en pleine journée, vous vous réveillez et vous remarquez que certaines personnes se sont livrées au cannibalisme…
Tsunami of the Dead est une attraction palpitante qui combine une expérience immersive de zombies avec un toboggan géant, plongeant les visiteurs dans un scénario apocalyptique où une vague massive de zombies envahit une station balnéaire.
', 1),
  (6, 'Bloodbath Lagoo' ,'Vous êtes un employé d’une station balnéaire, cela fait longtemps que vous faites ce métier, vous vous y connaissez en situation de crise. Malheureusement, ce que vous n’avez pas appris c’est comment gérer des zombies et encore moins dans un milieu aquatique…
Bloodbath Lagoon est une attraction immersive qui combine l''excitation d''une piscine à vagues avec une ambiance de zombie terrifiante. Les visiteurs plongent dans un environnement aquatique où l''eau semble infestée de créatures et de morts-vivants, créant une expérience à la fois rafraîchissante et palpitante.
', 1),
  (7, 'ZombAl Apocalypse' ,'Vous êtes dans un futur incertain, le prochain jeu tant attendu est sorti et vous décidez d’y jouer. Battre des zombies tout en étant au chaud chez soi, qu’est-ce qu’il peut y avoir de mieux ? En plus de cela le réalisme de ce jeu est incroyable ! Peut-être même un peu trop…
 ZombAl Apocalypse est une expérience immersive et interactive qui plonge les visiteurs dans un monde post-apocalyptique envahi par des zombies. Grâce à une intelligence artificielle (IA) avancée, les participants sont guidés à travers des scénarios palpitants où chaque choix compte. L''attraction combine des éléments de jeu de rôle, de réalité augmentée et de narration immersive.
', 1),
  (8, 'Le Labo de l''Enfer' ,'C’est une journée comme les autres ou presque, du moins pour vous qui travaillez dans un laboratoire. Une panne de réveil vient perturber votre routine mais ce n’est pas grave, cela arrive à tout le monde. A votre arrivée, vous remarquez que le laboratoire semble bien calme, jusqu''à ce qu''un être vienne tambouriner à votre porte…  "Le Labo de l''Enfer" est une expérience immersive qui plonge les visiteurs dans un laboratoire secret où des expériences scientifiques ont mal tourné, donnant naissance à une apocalypse zombie. Les participants doivent naviguer dans cette installation délabrée, résoudre des énigmes et échapper à des créatures effrayantes tout en découvrant les sombres secrets de l''endroit.', 1),
  (9, 'Les zombies au Moyen-Âge' ,'Durant ce spectacle de théâtre, les visiteurs vont découvrir une histoire qui se déroule au Moyen-Âge où dans un village, un virus inconnu va se développer au point de provoquer un événement national. Découvre dans cette histoire déjantée comment vont réagir les villageois et leur seigneur et surtout, vont-ils réussir à éteindre l’épidémie ou alors le virus va-t-il se propager jusqu’à être innarêtable ?', 2),
  (10, 'Parade des Zombies' ,'La Parade des Zombies est un événement nocturne qui transforme le parc en un monde apocalyptique peuplé de créatures terrifiantes. L''objectif est d''offrir une expérience immersive et divertissante, mélangeant théâtre, danse et interactions avec le public.', 2);

INSERT INTO "image" 
  ("id", "name", "link", "id_activity")
VALUES
  (1, 'Zombie 8', 'image\Activities\attractions\zombie_8.png', 1),
  (2, 'The Last Train' ,'image\Activities\attractions\the_last_train.png', 2),
  (3, 'Zombie Apocalypse Maze' ,'image\Activities\attractions\zombie_apocalypse_maze.jpg', 3),
  (4, 'Haunted Zombie House' ,'image\Activities\attractions\zombie_house.png', 4),
  (5, 'Tsunami of the Dead' ,'image\Activities\attractions\tsunami_of_the_dead.jpg', 5),
  (6, 'Bloodbath Lagoo' ,'image\Activities\attractions\blood_bath_lagoo.jpg', 6),
  (7, 'ZombAl Apocalypse' ,'image\Activities\attractions\zombai_apocalypse.jpg', 7),
  (8, 'Le Labo de l''Enfer' ,'image\Activities\attractions\le_laboratoire_de_lenfer.jpg', 8),
  (9, 'Les zombies au Moyen-Âge' ,'image\Activities\spectacles\Les_zombies_au_Moyen-Âge.png', 9),
  (10, 'Parade des Zombies' ,'image\Activities\spectacles\parade_des_zombies.png', 10)
;

-- On arrête le seeding des tables
COMMIT;


BEGIN;
-- On reset l'id de séquence car nous avons inséré manuellement les id durant notre seeding
-- on met donc à jour les id pour les prochaines fois où un enregistrement va être crée.
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));
SELECT setval('ticket_id_seq', (SELECT MAX(id) from "ticket"));
SELECT setval('tariff_id_seq', (SELECT MAX(id) from "tariff"));
SELECT setval('category_id_seq', (SELECT MAX(id) from "category"));
SELECT setval('activity_id_seq', (SELECT MAX(id) from "activity"));
SELECT setval('image_id_seq', (SELECT MAX(id) from "image"));

COMMIT;