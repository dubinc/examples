<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Dub;
use Dub\Models\Components;
use Dub\Models\Operations;

class LinkController extends Controller
{
    public function createLink()
    {
        try {
            $security = new Components\Security("xxx");
            $security->token = "dub_xxx";
            $dub = Dub\Dub::builder()->setSecurity($security)->build();

            $request = new Operations\CreateLinkRequestBody(
                url: 'https://google.com',
            );
            
            $response = $dub->links->create($request);

            dd($response);
        } catch (Throwable $e) {
            // handle exception
        }
    }
}

// $security = new Components\Security();
// Cannot assign null to property Dub\Models\Components\Security::$token of type string

//  $response = $dub->links->create($request);
//Cannot assign null to property Dub\Models\Components\LinkSchema::$expiresAt of type string
