import sanitizeHtml from "sanitize-html";

export const bodySanitizerMiddleware = (dirty, {
  // L'idée : pour chaque key/valeur du body,
  // si la valeur est une "string", on la passe au html-sanitizer
  
  // Object.keys(req.body); // Pour une carte : ["content", "position", "color", "list_id"]
 
    allowedTags: [ ],
    allowedAttributes: {},
});
 

  next();

