# Rutinskapare

https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow 
https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase 

Arbetssätt Cheat Sheet:

  Ställ dig på develop:
  
    git checkout develop
  
  Skapa ny branch:
  
    git checkout -b "NewBranchName"
  
  För att lägga upp ändringar:
  
    git add .
    git commit -m "short description of what changes i made"
    git push -u origin "NewBranchName"           <----- om första pushen på den branchen
    git push                                  <----- efter man pushat första gången på den branchen
    (efter man pushat går man sedan in i github och lägger upp ett pullrequest för BranchName in i develop)
    
  För att rebasea (ebba skriver)
