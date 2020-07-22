@extends('layouts.app')

@section('content')
<!--Start Today Games Table-->
<div class="col-sm-12">
    <div class="card ">
      <div class="card-header">
        <h4 class="card-title text-center" style="font-weight:bold"> Today Free Games</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table tablesorter table-bordered table-codensed">
            <thead class=" text-primary">
              <tr>
                <th>
                  Game
                </th>
                <th>
                    League
                  </th>
                <th>
                  Kick Off
                </th>
                <th>
                  Pick 
                </th>
                <th class="text-center">
                  Outcome
                </th>
              </tr>
            </thead>
            <!--End Thead-->
            <!--Start Body-->
            <tbody>
              <tr>
                <td>
                  Kenya V.s Nigeria
                </td>
                <td>
                   Africa Championship
                  </td>
                <td>
                  12:40 GMT
                </td>
                <td style="font-weight:bold;color:yellow !important">
                  Pick HT/FT Nigeria
                </td>
                <td class="text-center">
                 <i class="fa fa-check" style="color:greenyellow"></i>
                </td>
              </tr>
            </tbody>
            <!--End Body-->
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--End  Container-->
  <!--Start Today Games Table-->
<div class="col-md-12">
    <div class="card ">
      <div class="card-header">
        <h4 class="card-title text-center" style="font-weight:bold">Past Games And Predictions</h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table tablesorter table-bordered table-codensed">
            <thead class=" text-primary">
              <tr>
                <th>
                  Game
                </th>
                <th>
                    League
                </th>
                <th>
                  Kick Off
                </th>
                <th>
                  Pick 
                </th>
                <th class="text-center">
                  Outcome
                </th>
              </tr>
            </thead>
            <!--End Thead-->
            <!--Start Body-->
            <tbody>
              <tr>
                <td>
                  Arsenal Vs QPR
                </td>
                <td>
                   Capitol 1
                  </td>
                <td>
                  Niger
                </td>
                <td style="font-weight:bold;color:yellow !important">
                  Pick : GG
                </td>
                <td class="text-center">
                  <i class="fa fa-times" style="color:red"></i>
                </td>
              </tr>
            </tbody>
            <!--End Body-->
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--End  Container-->
@endsection
