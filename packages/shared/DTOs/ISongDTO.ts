export interface ISongDTO {
    id: string;
    name: string;
    folderId: string;
    lyric: Array<ILyric>;
    strophes: [{
        id: number;
        type: typeOfStrophe;
        number: number; // Only used if the type is strophe
    }];
    presentationProfile: [{
        id: number;
        name: string;
        presentationOrder: [{
            id: number;
            index: number;
            type: typeOfPresentationOrder;
            ref: number; // Reference to a lyric or strophe id
        }];
    }];
    options: {
        backgroundVideo: string;
        backgroundImage: string;
        presentationProfileId: number;
    };
}

enum typeOfStrophe {
    chorus,
    strophe
}

enum typeOfPresentationOrder {
    lyric,
    strophe
}

export interface ILyric {    
    id: number;
    stropheId: number;
    textContent: string;    
}
