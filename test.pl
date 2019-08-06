homem(luiz).
homem(hemerson).
homem(angelo).
homem(petch).
homem(will).
homem(gabriel).
homem(lucas).

mulher(julia).
mulher(bia).
mulher(vitoria).
mulher(kelmer).
mulher(gabriela).

pai(petch, luiz).
pai(petch, bia).
pai(petch, charms).
pai(petch, maupeba).

mae(julia, luiz).
mae(julia, bia).
mae(julia, charms).
mae(julia, maupeba).

irmaos(X,Y) :- mae(Z, X), mae(Z, Y), X \== Y.

avos(X,Y) :- pai(X, Z), pai(Z, Y).
avos(X,Y) :- pai(X, Z), mae(Z, Y).
avos(X,Y) :- mae(X, Z), pai(Z, Y).
avos(X,Y) :- mae(X, Z), mae(Z, Y).

tio(T,Y)   :- pai(AVO, T), pai(AVO, PAI), pai(PAI, Y), T \== PAI. 
