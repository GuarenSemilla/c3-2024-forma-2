import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    try 
    {
    const ocurrence = ctx.params.ocurrence;
    if (ocurrence.length === 2)
        {
        const temp1=parseInt(ocurrence[0]);
        const temp2=parseInt(ocurrence[1]);
        const dato1=temp1.toString();
        const dato2=temp2.toString();
        if(dato1==="NaN" && dato2==="NaN")
            {
            if(ocurrence==="ac"||ocurrence==="dc")
                {
                ctx.body = historicalEventsRepository.getHistoricalEvents(ocurrence)
                }else{
                    ctx.status = 400;
                    ctx.body = { message:"El input debe ser ac o dc"};
                    }
            }else{
                ctx.status = 400;
                ctx.body = { message:"Solo se aceptan caracteres no numéricos"};
                }

        }else{
            ctx.status = 400;
            ctx.body = { message:"El input debe ser == 2" };
            }
    return ctx
    }catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error interno del servidor' };
}
}