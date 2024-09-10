<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Dub\Dub;
use Dub\Models\Components;
use Dub\Models\Operations;
use Dub\Components\Security;

class LinkController extends Controller
{
    public function createLink()
    {
        try {
            $security = new Components\Security(config('services.dub.api_key'));
            $dub = Dub::builder()->setSecurity($security->token)->build();

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
