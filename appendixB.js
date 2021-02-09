const store = {
        document: {
        8: { id: 8, report_id: 4, name: 'Sample Document', filetype: 'txt' },
        34: { id: 34, report_id: 21, name: 'Quarterly Report', filetype: 'pdf' },
        87: { id: 87, report_id: 21, name: 'Performance Summary', filetype: 'pdf' },
        },
        page: {
        19: { id: 19, document_id: 34, body: 'Lorem ipsum...', footnote: null },
        72: { id: 72, document_id: 87, body: 'Ut aliquet...', footnote: 'Aliquam erat...' },
        205: { id: 205, document_id: 34, body: 'Donec a dui et...', footnote: null },
        },
        report: {
        4: { id: 4, title: 'Sample Report' },
        21: { id: 21, title: 'sample re' },
        // 34: { id: 34, title: 'Portfolio Summary 2020' },
        // 55: { id: 45, title: 'Portfolio Summary 2021' },
        },
}

/* 1  */
function mapPagesToReports(obj){

    const {document, page}=obj;
    
    let pagesToReports={}

    for(let documentId in document){
        let reportId=document[documentId].report_id;
    
        //if it does not exist then we create the newobject
        if(!pagesToReports[reportId]){
            pagesToReports[reportId]=[]
        }

        for(let pageId in page){
            let pageIdFromDocumentId=page[pageId].document_id
            
            if(documentId===pageIdFromDocumentId.toString()){
                pagesToReports[reportId].push(pageId)
            }
        }
        
    }
    return pagesToReports;
}

console.log(mapPagesToReports(store))

/* 2 */

const searchReports=(phrase)=>{
    //destructuring 
    let {report}= store;
    
    let found=[]
    for(x in report){
        let titleData=report[x].title;
        //lowercase to ignore case senstivity
        if(titleData.toLowerCase().includes(phrase)){
            found.push(report[x]);
        }
    }

    return found;
}

console.log(searchReports('sum'))

/*
3 Since it is an async function we have to await for the promise to resolve. We can do that by importing the axios library that simplifies the fetch.then process of regular fetching.
a typical function would look like. In addition the try and catch is added in the below example to demonstrate

import axios from 'axios';

const getData= async(query)=>{
    try{
        let resp=await axios.get(query);
        console.log(resp.data)
    }catch(e){
        console.log(e)
    }
}

*/
