// on cree une fonction afin de gerer les erreurs potentielles
export const controllerWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    console.error(err);

    if(err.name === 'ValidationError'){
      return res.status(400).json({error: err.message});
    }

    res.status(500).json({error: 'Internal Server Error'});
  }
};