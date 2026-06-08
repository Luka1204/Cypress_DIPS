class pageRequest
{
    getRequest(url,headers, body){
        return cy.request({
            method: 'GET',
            url: url,
            headers: headers,
            body: body
        }).then((response)=>{
            expect(response.status).to.eq(200)
            return response
        });
    }

    postRequest(url, headers, body){
        return cy.request({
            method: 'POST',
            url: url,
            headers: headers,
            failOnStatusCode: false,
            body: body
        }).then((response)=>{
            
            return response
        });
    }
}module.exports = new pageRequest();