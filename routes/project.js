var models = require('../models');


exports.projectInfo = function(req, res) {
  var projectID = req.params.id;

  // query for the specific project and
  models.Project.find({"_id" : projectID}).exec(afterQuery);
  // call the following callback
  //afterQuery("couldn't find", projects_);
  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  
  // make a new Project and save it to the DB
  var newProject = new models.Project(
  {
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url

  });
  
  newProject.save(function(err)
  {
    if(err)console.log('why' + err);
    res.send();
  });


  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  console.log('delete project : ' + projectID);

  // find the project and remove it
  models.Project.find({'_id': projectID}).remove().exec(response);
  // YOU MUST send an OK response w/ res.send();
  function response(err)
  {
    if(err)console.log('why' + err);
    res.send();
  }
}