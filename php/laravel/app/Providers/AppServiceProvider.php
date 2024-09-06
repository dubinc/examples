<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // $this->app->bind(Dub::class, function ($app) {
        //     $security = new Security();
        //     $security->token = $app['config']->get('services.dub.api_key');
        
        //     return Dub::builder()->setSecurity($security)->build();
        // });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
