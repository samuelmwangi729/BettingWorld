@extends('layouts.app',['pageSlug'=>'game'])
@section('content')
<div class="container">
  <h3 class="text-center">  Add Games</h3>
    <div class="row">
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                  <form>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputEmail4">Home Team</label>
                        <input type="HomeTeam" class="form-control {{ $errors->has('HomeTeam') ? ' is-invalid' : '' }}"  placeholder="Eg. Man City">
                        @include('alerts.feedback', ['field' => 'HomeTeam'])
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPassword4">Away Team</label>
                        <input type="AwayTeam" class="form-control {{ $errors->has('AwayTeam') ? ' is-invalid' : '' }}"  placeholder="Eg.Chelsea">
                        @include('alerts.feedback', ['field' => 'AwayTeam'])
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputAddress">Prediction</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
                    </div>
                    <div class="form-group">
                      <label for="inputAddress2">Type(Free/Paid)</label>
                      <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity">
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control">
                          <option selected>Choose...</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip">
                      </div>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" value="">
                            Check me out
                            <span class="form-check-sign">
                              <span class="check"></span>
                            </span>
                        </label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                  </form>
                </div>
              </div>
        </div>
        <div class="col-sm-6">
            <table class="table">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Name</th>
                        <th>Job Position</th>
                        <th>Since</th>
                        <th class="text-right">Salary</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>Andrew Mike</td>
                        <td>Develop</td>
                        <td>2013</td>
                        <td class="text-right">&euro; 99,225</td>
                        <td class="td-actions text-right">
                            <button type="button" rel="tooltip" class="btn btn-info btn-sm btn-icon">
                                <i class="tim-icons icon-single-02"></i>
                            </button>
                            <button type="button" rel="tooltip" class="btn btn-success btn-sm btn-icon">
                                <i class="tim-icons icon-settings"></i>
                            </button>
                            <button type="button" rel="tooltip" class="btn btn-danger btn-sm btn-icon">
                                <i class="tim-icons icon-simple-remove"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection