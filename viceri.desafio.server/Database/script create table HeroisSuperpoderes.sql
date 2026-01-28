CREATE TABLE HeroisSuperpoderes (
    HeroiId INT NOT NULL,
    SuperpoderId INT NOT NULL,
    
    PRIMARY KEY (HeroiId, SuperpoderId),
    
    CONSTRAINT FK_Herois_Superpoderes_Heroi FOREIGN KEY (HeroiId) 
        REFERENCES Herois(Id) ON DELETE CASCADE,
        
    CONSTRAINT FK_Herois_Superpoderes_Poder FOREIGN KEY (SuperpoderId) 
        REFERENCES Superpoderes(Id) ON DELETE CASCADE
);